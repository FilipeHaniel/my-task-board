import { Component } from '@angular/core'
import { CategoryComponent } from '../../features/category/view/category/category.component'
import { TaskComponent } from '../../features/task/view/task/task.component'

import { MatDividerModule } from '@angular/material/divider'

const COMPONENTS = [ CategoryComponent, TaskComponent ]
const MODULES = [ MatDividerModule ]

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [...COMPONENTS, ...MODULES],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
