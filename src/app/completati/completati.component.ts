import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import * as TodoSrv from '../todos.service';

@Component({

  //Nel component aggiungo l'html(template: `...`,) e il css (style:[`...`],)

  template: `
    <div id="finito">
      <h3>Task Terminate</h3>
      <ng-container *ngIf="tasks; else ciSonoTask">
        <div *ngIf="tasks.length > 0; else nonCiSonoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div id="taskFinite">{{ task.title }} <span> <i class="fa-solid fa-check-double"></i></span></div>
          </div>
        </div>
      </ng-container>
      <ng-template #ciSonoTask>
      <div class="smile"></div>
        <p>Recupero delle Task in corso...</p>
      </ng-template>
    </div>
    <ng-template #nonCiSonoTask> <p id="noTask"> * Non ci sono task completati * </p> </ng-template>
  `,
  styles: [
    `
      #finito {
        margin-top: 50px;
        margin-left: 30%;
        padding: 20px;
        text-align: center;
        width:fit-content;
      }
      .fa-check-double{
        color:green;
      }
      #taskFinite {
        background-color: lightgrey;
        color: black;
        text-decoration: line-through;
        width: fit-content;
        margin-bottom:10px;
      }
      h3{
        margin-bottom:30px;
        border: 2px solid blue;
        padding:10px;
        background-color:lightgrey;
      }

      #noTask{
        color: red;
      }

      .smile {
        position: relative;
        margin-left:80px;
        margin-bottom:30px;
        width: 40px;
        height: 40px;
        border-top: 10px solid aqua;
        border-radius: 50%;
        animation: smile 2.5s linear infinite;
      }

      .smile::before {
        position: absolute;
        height: 15px;
        width: 15px;
        top: 30px;
        left: -5px;
        background: aqua;
        border-radius: 25%;
        content: '';
      }

      .smile::after {
        position: absolute;
        height: 15px;
        width: 15px;
        top: 30px;
        right: -5px;
        background: aqua;
        border-radius: 25%;
        content: '';
      }

      /* Animazione per far roteare lo smile */
      @keyframes smile {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class CompletedPage {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoSrv.get().then(
      (todos) => (this.tasks = todos.filter((todo) => todo.completed))
    );
  }
}
