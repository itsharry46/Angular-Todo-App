import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid)
      return alert("Todo Field Can't Be Empty");

    this.dataService.addTodo( new Todo(form.value.text))

    form.reset();
  }

  setCompleted(todo: Todo) {
      // set todo to completed
      todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    // We need index of todo and user needs to enter new updated information
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',  
      data: todo
    });
    //this.dataService.updateTodo(todo);

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        this.dataService.updateTodo(index, result);
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    this.dataService.deleteTodo(index);
  }

}
function hide(arg0: HTMLElement | null) {
  throw new Error('Function not implemented.');
}

