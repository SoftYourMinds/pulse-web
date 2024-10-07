import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-burger-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burger-button.component.html',
  styleUrl: './burger-button.component.scss'
})
export class BurgerButtonComponent {
    @Output() handleClick: EventEmitter<void> = new EventEmitter<void>;

    public isOpen: boolean = false;

    public onClick(): void {
      this.isOpen = !this.isOpen;
      this.handleClick.emit();
    }
}
