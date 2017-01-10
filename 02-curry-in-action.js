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

const getIncompleteTaskSummaries = (data, name) => {
    const tasks = data.tasks || [];
    return Promise.resolve(tasks.filter(task => !task.complete && task.username == name));
}

// pure
// 1. return Object... no side effect
// 2. only depends on it's parameters
getIncompleteTaskSummaries(data, 'Lena')
    .then(console.log)
    .catch(console.error)


// [ { id: 105,
// priority: 'medium',
// dueDate: '2013-11-22',
// title: 'Do something else' } ]

// TODO
getIncompleteTaskSummaries(data, 'Scott')
    .then(console.log)
    .catch(console.error)

//     [ { id: 110,
//       priority: 'medium',
//       dueDate: '2013-11-15',
//       title: 'Rename everything' },
//      { id: 104,
//       priority: 'high',
//       dueDate: '2013-11-29',
//       title: 'Do something' }
//     ]
