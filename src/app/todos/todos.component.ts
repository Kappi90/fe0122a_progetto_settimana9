import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import * as TodoSrv from '../todos.service';

@Component({

  //Nel component aggiungo l'html(template: `...`,) e il css (style:[`...`],)
  template: `
    <div id="lista">
      <ng-container *ngIf="tasks; else ciSonoTask">
        <div *ngIf="tasks.length > 0; else nonCiSonoTask">
          <div *ngFor="let task of tasks; let i = index">
            <div id="taskAggiunte">
              - {{ task.title }}
              <button class="complete" (click)="completeTask(task, i)">
               <i class="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #ciSonoTask>
        <div class="smile"></div>
        <p>Recupero delle Tasks in corso...</p>
      </ng-template>
    </div>
    <div class="footer">
      <input
        type="text"
        [(ngModel)]="newTaskTitle"
        placeholder="Aggiungi una nuova Task"
        id="input"
      />
      <button id="aggiungi" (click)="addTask()">+</button>
    </div>
    <ng-template #nonCiSonoTask>
      <p id="noTask">* Non ci sono Task *</p>
    </ng-template>
  `,
  styles: [
    `
      #lista {
        margin-top: 50px;
        margin-left: 30%;
      }
      .fa-check{
        color: orange;
      }
      #taskAggiunte {
        margin-bottom: 10px;
      }
      button.complete {
        background: transparent;
        border: none;
      }
      .footer {
        margin-left: 30%;
      }
      #aggiungi {
        background-color: DodgerBlue;
        border: 1px solid black;
        font-weight: bolder;
        color: black;
        margin-left: 5px;
        font-size: 18px;
        cursor: pointer;
      }
      #aggiungi:active {
        transform: scale(0.7, 0.7);
      }

      #noTask {
        margin-left: 40px;
        color: red;
      }

      #input {
        border: 1px solid black;
        padding: 3px;
      }

      .smile {
        position: relative;
        margin-left: 80px;
        margin-bottom: 30px;
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
export class TodosPage implements OnInit {
  tasks!: Todo[];

  newTaskTitle: string | undefined;
  constructor() {
    TodoSrv.get().then(
      (todos) => (this.tasks = todos.filter((todo) => !todo.completed))
    );
  }

  ngOnInit(): void {}

  //Aggiungo le task scritte nell'input alla lista
  async addTask() {
    if (this.newTaskTitle === "") {
      return alert('Scrivi qualcosa');
    } else if(this.newTaskTitle === this.newTaskTitle)  {
      const nTodo = await TodoSrv.add({
        title: this.newTaskTitle as string,
        completed: false,
      });
      this.tasks.push(nTodo);
      this.newTaskTitle = '';
    }
  }

  //Aggiungo le task completate alla pagina completati
  async completeTask(todo: Todo, i: number) {
    await TodoSrv.update({ completed: true }, todo.id);
    this.tasks.splice(i, 1);
  }
}
