import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-register',
    standalone: false,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    baseUrl = environment.apiUrl;
    registerForm: FormGroup = new FormGroup({});
    validationErrors: string[] | undefined;
    constructor(private accountService: AccountService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    openLogin() {
        this.router.navigate(['/login']);
    }

    initializeForm() {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
            confirmPassword: ['', [Validators.required, this.matchValues('password')]]
        });
        this.registerForm.controls['password'].valueChanges.subscribe({
            next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
        });
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
        }
    }

    register() {
        const values = { ...this.registerForm.value }
        this.accountService.register(values).subscribe({
            next: response => {
                this.router.navigateByUrl('/persons');
            },
            error: error => {
                this.validationErrors = error;
            }
        })
    }
}
