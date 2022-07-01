import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../lib/collection.js';
import './main.html';
import './addTask.html';
import './addTask.js';
import './listTasks.html';
import './listTasks.js';

// task
// status
// dueDate
// ownId
// compId
// private: Boolean
// trashBin