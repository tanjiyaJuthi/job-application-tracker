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