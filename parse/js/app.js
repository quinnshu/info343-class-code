/*
    script for the index.html file
*/

<<<<<<< HEAD
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

=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
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

<<<<<<< HEAD

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);

    }

    function onData(result) {
        tasks = result;
=======
    function onData(results) {
        tasks = results;
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
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

<<<<<<< HEAD
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
=======
    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
