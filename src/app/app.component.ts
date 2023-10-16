

import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";
import { NgForm } from '@angular/forms';
import { Todo } from 'src/Modals/Modal'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  content: Todo[] = [];
  title = 'todolist';
  count: number = 0

  ngOnInit() {
    const storedContent = localStorage.getItem('todoContent');
    if (storedContent) {
      this.content = JSON.parse(storedContent);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('todoContent', JSON.stringify(this.content));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.title.trim() === '') {
      return;
    }
    let todo = new Todo(Guid.create(), form.value.title, false);
    this.content.push(todo);
    this.saveToLocalStorage();
    form.resetForm();
  }

  onComplete(id: Guid) {
    let todo = this.content.find(x => x.id === id);
    if (todo) {
      todo.isComplete = true;
      this.saveToLocalStorage();
    }
  }

  onDelete(id: Guid) {
    let todoIndex = this.content.findIndex(x => x.id === id);
    if (todoIndex !== -1) {
      this.content.splice(todoIndex, 1);
      this.saveToLocalStorage();
    }
  }
  clearTodos() {
    this.content = []
    this.saveToLocalStorage();
  }
}
