import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
    
    public userForm: FormGroup;

    constructor(
      private fb: FormBuilder,
    ) {
      
    }

    ngOnInit(): void {
      this.userForm = this.fb.group({
          name: [''],
          phone: [''],
          robot: [''],
          email: ['', Validators.email],
      });
    }
}
