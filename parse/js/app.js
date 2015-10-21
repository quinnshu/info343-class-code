/*
    script for the index.html file
*/

Parse.initialize("82lMnxZmrTmGsVnGXAdxjamCwkyG7wLW9UXVde33", "84gs7HBQKk5uCSkSGdTujo8rdcYTcbmrs9A2W95X");

$(function() {
    'use strict';

    //new Task class for parse
    var Task = Parse.Object.extend('Task');
    //new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //reference to the task list element
    var tasksList = $('#tasks-list');
    //refrence to the error message alert
    var errorMessage = $('#error-message');
    // current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }


    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);

    }

    function onData(result) {
        tasks = result;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    //when the user submits the new task form..
    $('#new-task-form').submit(function(evt) {
       //neccessary to work in all browsers, along with return false
        evt.preventDefault();

        //attribute selector syntax - find "title" in "this"
        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks(), displayError).then(function(){
            titleInput.val('');
        });

        return false;
    });

    //go and fetch tasks from Parse
    fetchTasks();

    window.setInterval(fetchTasks, 3000);


});