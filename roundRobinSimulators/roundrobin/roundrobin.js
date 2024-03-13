
function allProcessComplete(processes){
    for(const p of processes){
        if(p[4]===-1){
            return false;
        }
    }
    return true;
}

// Function to start Round Robin simulation
function startRoundRobin() {
    let processes = [];
    let processCount = document.getElementById('processCount').value;
    let timeQuantum = parseInt(document.getElementById('timeQuantum').value);

    for (let i = 1; i <= processCount; i++) {
        let arrivalTime = parseInt(document.getElementById(`arrivalTime${i}`).value);
        let burstTime = parseInt(document.getElementById(`burstTime${i}`).value);
        let priority = parseInt(document.getElementById(`priority${i}`).value);
        let completionTime = -1;
        let remainingTime=burstTime;

        processes.push([`P${i}`, arrivalTime, burstTime, remainingTime, completionTime, priority]);
    }

    processes.sort((a, b) => a[1] - b[1]); // sort based on arrival time, incase of same, check priority
    


    processes.sort((a, b) => {
        if (a[1] < b[1]) {
            return -1;
        } else if (a[1] > b[1]) {
            return 1;
        } else {
            return a[5]-b[5]; //priority incase of same arrival
        }
    });

    // Call Round Robin simulation logic
    simulateRoundRobin(processes, timeQuantum);
}

function updateReadyQueue(queue) {
    const readyQueueDiv = document.getElementById('readyQueue');
    readyQueueDiv.innerHTML += `<div class="process-horizontal">`+
     queue.map(process => 
        `${process[0]} (Rem. BT: ${process[3]}s)`)+
     `</div>`;
}

 function updateProcessPipeline(processId, starttime, endtime) {
    let processPipelineDiv = document.getElementById('processPipeline');
    processPipelineDiv.innerHTML += `
        <div class="process">
            ${processId} (Start: ${starttime}s, End: ${endtime}
        </div>
    `;

}

// -----------------------

function simulateRoundRobin(processes, timeQuantum) {
    let resultsDiv =  document.getElementById('results');
    resultsDiv.innerHTML = `
        </div>
        <div class="pipeline-horizontal" id="top-pipeline">
            <p>Ready Queue Iterations:</p>
            <div id="readyQueue" class="ready-queue" style="overflow:scroll;"></div>
        </div>
        <div class="space"></div>

        <div class="pipeline-horizontal" id="bottom-pipeline">
            <p>Process Execution Pipeline:</p>
            <div id="processPipeline" class="process-pipeline"></div>
        </div>
        <p>Total Execution Time: <span id="totalExecutionTime">0</span>s</p>
        <p>Average Waiting Time: <span id="averageWaitingTime">0</span>s</p>
        <p>Average Turnaround Time: <span id="averageTurnaroundTime">0</span>s</p>`;

    let currentTime = 0;
    let readyQueue = []; // Ready queue initially empty
    let index = 0; // Index to keep track of the next process to arrive
    
    while(true){
        if(allProcessComplete(processes)){
            break;
        }
        
        // 1. update ready queue at current time (at time =t, add all the process which arrive at t) -- add based on priority at same time
        // 1a. Print ready queue to display
        // 2. pick process to execute (pick and remove from the starting side of Ready Q)
        // 3. calculate execution time (calculate execution time by min of quantum and remaining time)
        // 4. add the processes between current+1 and current+executiontime both inclusive to the Ready Q -- add based on priority at same time
        // 5. execute the picked process by updating its remaining time, and check for completion
        // 6. increment current time by execution time.
        // 6a. add cell to gantt chart by calling update process pipeline function
        // 6b. if yes, update completion time.
        // 6c. if no, add back the process with remaining time to ready queue's end.
        // 6d. print ready queue to display
        // 7. repeat until processes all are completed (check complete time not -1 from processes list).


        // 1. update ready queue at current time (at time =t, add all the process which arrive at t)
        let i=0;
        while(i<processes.length && processes[i][1]<=currentTime){
            if(processes[i][1]==currentTime){
                // Check for higher priority processes
                let j = i+1;
                while(j < processes.length && processes[j][1] == currentTime && processes[j][5] < processes[i][5]){
                    // Swap if higher priority process found
                    let tmp=processes[j]; 
                    processes[j] = processes[i];
                    processes[i]=tmp;
                    j += 1;
                }
                readyQueue.push(processes[i]);
            }
            i+=1;
        }

        // 1a. Print ready queue to display
        updateReadyQueue(readyQueue);

        // 2. pick process to execute (pick and remove from the starting side of Ready Q)
        if(readyQueue.length>0){
            let pickedProcess = readyQueue.shift();
            // 3. calculate execution time (calculate execution time by min of quantum and remaining time)
            let executionTime = Math.min(timeQuantum, pickedProcess[3]);
            // 4. add the processes between current+1 and current+executiontime both inclusive to the Ready Q
            let ptr1=currentTime+1;
            let ptr2=currentTime+executionTime;

            //here, processes are added based on their priority when they have a same value for arrival time.
            processes.forEach(p =>{
                if(p[1]>=ptr1 && p[1]<=ptr2){
                    let i = processes.indexOf(p) + 1;
                    while (i < processes.length && processes[i][1]==p[1] && processes[i][5]<p[5]) {
                        // Swap if higher priority process found at same arrival time
                        let temp= processes[i];
                        processes[i]=p;
                        p = temp;

                        i++;
                    }
                    readyQueue.push(p);
                }
            });

            // 5. execute the picked process by updating its remaining time, and check for completion
            pickedProcess[3] -= executionTime;
            // 6a. add cell to gantt chart by calling update process pipeline function
            updateProcessPipeline(pickedProcess[0], currentTime, currentTime+executionTime);
            if(pickedProcess[3]==0){ // if yes, update completion time in this instance, and main processes list
                pickedProcess[4]=currentTime+executionTime;
                processes.forEach(p =>{
                    if(p[0]==pickedProcess[0]){
                        p[4]=currentTime+executionTime;
                        p[3]=0;
                    }
                });
            }
            else{   // if no, add back the process with remaining time to ready queue's end.
                readyQueue.push(pickedProcess);
            }
            // 6d. print ready queue to display
            updateReadyQueue(readyQueue);
            // 6. increment current time by execution time.
            currentTime += executionTime;
        }
        else{
            currentTime += 1;
        }
    }
    [aTT,aWT] = calculateAverageTimes(processes);
    document.getElementById("totalExecutionTime").innerText=currentTime.toFixed(2);
    document.getElementById("averageWaitingTime").innerText=aWT.toFixed(2);
    document.getElementById("averageTurnaroundTime").innerText=aTT.toFixed(2);
 }

function calculateAverageTimes(processes) {
    let totalTurnaroundTime=0;
    let totalWaitingTime=0;
    processes.forEach(processItr =>{ 
        let thisProcessTurnAroundTime=processItr[4]-processItr[1];
        let thisProcessWaitingTime=thisProcessTurnAroundTime-processItr[2];
        totalTurnaroundTime += thisProcessTurnAroundTime;
        totalWaitingTime += thisProcessWaitingTime;
    })
    let numberOfProcesses=processes.length;
    return [totalTurnaroundTime/numberOfProcesses, totalWaitingTime/numberOfProcesses];

}
