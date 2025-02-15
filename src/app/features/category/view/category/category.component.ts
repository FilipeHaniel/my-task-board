import { Component, inject } from '@angular/core'

import { MainListComponent } from '../../components/main-list/main-list.component'
import { ColorsListComponent } from '../../components/colors-list/colors-list.component'
import { CategoryService } from '../../services/category.service'
import { AsyncPipe } from '@angular/common'

const COMPONENTS = [ MainListComponent, ColorsListComponent ]
const PIPES = [ AsyncPipe ]

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...COMPONENTS, ...PIPES],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  // private readonly categoryService = inject(CategoryService)
}
