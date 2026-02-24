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