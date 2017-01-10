const R = require('ramda')
const { pipe, map, prop, filter, reject, pick, sortBy, propEq, tap } = R

// R.pipe(
//     R.prop('tasks'),
//     R.filter(R.propEq('username', memberName)),
//     R.reject(R.propEq('complete', true)),
//     R.map(R.pick(['title', 'priority'])),
//     R.tap(console.warn),
// R.sortBy(R.prop('dueDate'))

/**
 * getIncompleteTaskSummaries
 */

const data = {
    result: 'SUCCESS',
    interfaceVersion: '1.0.3',
    requested: '10/17/2013 15:31:20',
    lastUpdated: '10/16/2013 10:52:39',
    tasks: [
        {
            id: 104, complete: false, priority: 'high',
            dueDate: '2013-11-29', username: 'Scott',
            title: 'Do something', created: '9/22/2013'
        },
        {
            id: 105, complete: false, priority: 'medium',
            dueDate: '2013-11-22', username: 'Lena',
            title: 'Do something else', created: '9/22/2013'
        },
        {
            id: 107, complete: true, priority: 'high',
            dueDate: '2013-11-22', username: 'Mike',
            title: 'Fix the foo', created: '9/22/2013'
        },
        {
            id: 108, complete: false, priority: 'low',
            dueDate: '2013-11-15', username: 'Punam',
            title: 'Adjust the bar', created: '9/25/2013'
        },
        {
            id: 110, complete: false, priority: 'medium',
            dueDate: '2013-11-15', username: 'Scott',
            title: 'Rename everything', created: '10/2/2013'
        },
        {
            id: 112, complete: true, priority: 'high',
            dueDate: '2013-11-27', username: 'Lena',
            title: 'Alter all quuxes', created: '10/5/2013'
        }
        // , ...
    ]
}

const incompleteTask = tasks => tasks.filter(task => !task.complete)
const byUser = username => tasks => tasks.filter(task => task.username == username)
const sortByAttr = attr => tasks => tasks.sort((a, b) => a[attr] - b[attr])
const summary = tasks => tasks.map(({ title, priority }) => ({ title, priority }));
const getIncompleteTaskSummaries = R.pipe(incompleteTask, byUser('Scott'), sortByAttr('date'), summary)

const fetchData = (predicate, data) => {
    const tasks = data.tasks || [];
    return Promise.resolve(predicate(tasks));
}


// pure
// 1. return Object... no side effect
// 2. only depends on it's parameters
fetchData(getIncompleteTaskSummaries, data)
    .then(console.log)
    .catch(console.error)


// Step3: with curring
const fetchData2 = data => Promise.resolve(data)

const getIncompleteTaskSummaries2 = (data, memberName) =>
    fetchData2(data)
        .then(R.prop('tasks'))
        .then(R.filter(R.propEq('username', memberName)))
        .then(R.reject(R.propEq('complete', true)))
        .then(R.map(R.pick(['title', 'priority'])))
        .then(R.sortBy(R.prop('dueDate')))

// getIncompleteTaskSummaries2(data, 'Scott')
//     .then(console.log)
//     .catch(console.error)

// dont leak prmise everywhere
const getIncompleteTaskSummaries3 = (data, memberName) =>
    fetchData2(data)
    // business logic here
        .then(R.pipe(
            R.prop('tasks'),
            R.filter(R.propEq('username', memberName)),
            R.reject(R.propEq('complete', true)),
            R.map(R.pick(['title', 'priority'])),
            // R.tap(console.warn),
            R.sortBy(R.prop('dueDate'))
        ))

getIncompleteTaskSummaries3(data, 'Scott')
    .then(console.log)
    .catch(console.warn)

// fs.readFile('bla').pipe(transducer).pipe(process.stdout)


const getIncompleteTaskSummaries4 = (data, memberName) =>
    fetchData2(data)
        .then(pipe(
            prop('tasks'),
            filter(propEq('username', memberName)),
            reject(propEq('complete', true)),
            map(pick(['title', 'priority'])),
            sortBy(prop('dueDate'))
        ))

getIncompleteTaskSummaries4(data, 'Scott')
    .then(console.log)
    .catch(console.warn)
