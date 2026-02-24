// switch buttons
// get job data from dom
// update count
// render job
// handle job status

const trackerBtns = document.querySelectorAll('.tracker-btn');
const jobContainer = document.querySelector('.job-container');
const jobListContainer = document.querySelectorAll('.job-list-container');

const totalJob = document.querySelector('#total');
const interviewJob = document.querySelector('#interview');
const rejectedJob = document.querySelector('#rejected');
const jobNumber = document.querySelector('#job-number');

const allJobs = document.querySelectorAll('#all-jobs .job-list');
// console.log(allJobs);

// initialize state variable
let jobState = [];
let currentJob = 'all';

// event delegation for updating job status
jobContainer.addEventListener('click', (event) => {
    // console.log(event.target.closest('.job-list'));
    // get the clicked job list
    const jobList = event.target.closest('.job-list');

    if (!jobList) return;

    const companyName = jobList.querySelector('.company-name').innerText;
    const jobTitle = jobList.querySelector('.job-title').innerText;
    // console.log(companyName, jobTitle);

    // get job by job state
    const job = jobState.find(job =>
        job.companyName === companyName
        && job.jobTitle === jobTitle
    );
    
    // console.log(job);

    if (!job) return;
    
    // update status by clicking button
    if (event.target.classList.contains('interview-btn')) {
        job.status = 'interview';
    } else if (event.target.classList.contains('reject-btn')) {
        job.status = 'rejected';
    } else if (event.target.closest('.job-remover')) {
        jobState = jobState.filter(job => 
            job.companyName !== companyName
            || job.jobTitle !== jobTitle
        );

        // console.log(jobState);
    }

    renderJobs(currentJob);
    countUpdate();
});

// render jobs based on status
const renderJobs = (jobData) => {
    // clear all job list before rendering
    jobListContainer.forEach(container => container.innerHTML = '');

    // get the job according to job status
    const filteredJob = jobState.filter(job =>
        jobData === 'all'
        ? true
        : job.status === jobData
    );

    // console.log(filteredJob);

    // get the container id based on status
    const containerId = `${jobData}-jobs`;

    // console.log(containerId);

    const container = document.getElementById(containerId);

    // console.log(container);

    // if no job exists
    if (filteredJob.length === 0) {
        container.innerHTML = `
            <div class="no-jobs bg-base-100 rounded-xl border-2 border-gray-100 p-6 text-center py-[111px]">
                <p><i class="fa-regular fa-file-lines text-[100px]"></i></p>
                <p class="font-semibold text-[24px]">No jobs available</p>
                <p class="gray-color">Check back soon for new job opportunities</p>
            </div>
        `;

        return;
    }

    // render job in filtered list
    filteredJob.forEach(job => {
        const div = document.createElement('div');
        div.classList.add('job-list', 'bg-base-100', 'rounded-xl', 'border-2', 'border-gray-100', 'p-6', 'flex', 'justify-between');

        div.innerHTML = `
            <div class="job-list-left space-y-5">
                <div class="job-title-container">
                    <h3 class="company-name text-[18px]">${job.companyName}</h3>
                    <p class="job-title gray-color">${job.jobTitle}</p>
                </div>

                <div class="details flex gap-3 gray-color text-[14px]">
                    <p class="job-location">${job.jobLocation}</p>
                    <p>•</p>
                    <p class="job-type">${job.jobType}</p>
                    <p>•</p>
                    <p class="salary-range">${job.salaryRange}</p>
                </div>

                <div class="job-description-container">
                    <button class="btn border-0 font-medium ${
                        job.status === 'interview'
                        ?  'bg-[#10B981] text-white'
                        : job.status === 'rejected'
                        ? 'bg-[#EF4444] text-white'
                        : 'primary-color bg-[#EEF4FF]'
                    }">
                        ${
                            job.status === 'interview'
                            ? 'INTERVIEW'
                            : job.status === 'rejected'
                            ? 'REJECTED'
                            : 'NOT APPLIED'
                        }
                    </button>
                    <p class="job-description text-[14px] pt-2">${job.jobDescription}</p>
                </div>

                <div class="job-int-reject flex gap-2">
                    <button class="interview-btn btn btn-outline border-[#10B981] text-[#10B981]">INTERVIEW</button>
                    <button class="reject-btn btn btn-outline border-[#EF4444] text-[#EF4444]">REJECTED</button>
                </div>
            </div>

            <div class="job-list-right">
                <p class="job-remover border-2 border-gray-100 gray-color rounded-full p-1"><i class="fa-solid fa-trash-can"></i></p>
            </div>
        `;

        // append job to container
        container.appendChild(div);
    });
};

// update job count
const countUpdate = () => {
    // calculate total count
    const totalCount = jobState.length;

    // calculate interview count
    const interviewCount = jobState.filter(job =>
        job.status === 'interview'
    ).length;

    // calculate rejected count
    const rejectedCount = jobState.filter(job =>
        job.status === 'rejected'
    ).length;

    // update the counter
    totalJob.innerText = totalCount;
    interviewJob.innerText = interviewCount;
    rejectedJob.innerText = rejectedCount;

    // check the current count
    const currentCount = 
        currentJob === 'all'
            ? totalCount
            : currentJob === 'interview'
            ? interviewCount
            : rejectedCount;

    // update job or jobs with job number
    jobNumber.innerText = `${currentCount} ${currentCount === 1 ? 'Job'  : 'Jobs'}`;
};

// set count when page loads
countUpdate();

// retrieve data and store in jobState
allJobs.forEach(jobList => {
    const companyName = jobList.querySelector('.company-name').innerText;
    const jobTitle = jobList.querySelector('.job-title').innerText;
    const jobLocation = jobList.querySelector('.job-location').innerText;
    const jobType = jobList.querySelector('.job-type').innerText;
    const salaryRange = jobList.querySelector('.salary-range').innerText;
    const jobDescription = jobList.querySelector('.job-description').innerText;

    jobState.push({
        companyName,
        jobTitle,
        jobLocation,
        jobType,
        salaryRange,
        jobDescription,
        status: 'all' // default
    });

    // console.log(jobState);
});

// machine: to get job type from id
const getJobTypeFromId = (id) => {
    return id.replace(/-jobs$/, '');
};

// switching between buttons
trackerBtns.forEach(trackerBtn => {
    trackerBtn.addEventListener('click', (event) => {
        // reset all button to default 
        trackerBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        // highlight the clicked button
        trackerBtn.classList.add('active');

        // show the correct tab container
        jobListContainer.forEach(container => {
            container.classList.add('hidden');
        });
        const targetId = trackerBtn.dataset.target;
        // console.log(targetId);
        document.getElementById(targetId).classList.remove('hidden');

        // update current job
        currentJob = getJobTypeFromId(targetId);

        renderJobs(currentJob);
        countUpdate();
    });
});