---
title: 'Debugging Angular: A Tale of Two Developers'
date: 2024-05-22T16:00:22+03:30
layout: single
author_profile: true
url: 2024/05/22/debugging-angular-a-tale-of-two-developers/
shortlink: https://g.omid.dev/NSbInvx
tags:
  - frontend
  - development
lang: en
categories: 
  - techblog
---
In any software development project, encountering bugs and issues is inevitable. How we approach these problems often distinguishes a junior developer from a senior one. Today, we’ll walk through a more complex and challenging issue in an Angular project and compare how a junior and a senior developer might handle it.

## The Issue

Our Angular application is supposed to display a dynamic form based on metadata fetched from an API. The form structure is defined in the metadata, which includes information about the fields, their types, and validation rules. Despite the metadata being correctly fetched and parsed, the form does not render correctly, and the validation rules are not applied.

Here is the relevant code snippet:

```typescript
// form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) {}

  getFormMetadata(): Observable<any> {
    return this.http.get('https://api.example.com/form-metadata');
  }
}

// dynamic-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form">
      <div *ngFor="let field of fields">
        <label>{{ field.label }}</label>
        <input [formControlName]="field.name" [type]="field.type" />
        <div *ngIf="form.get(field.name).invalid && form.get(field.name).touched">
          {{ field.errorMessage }}
        </div>
      </div>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  fields: any[] = [];

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit() {
    this.formService.getFormMetadata().subscribe((metadata) => {
      this.fields = metadata.fields;
      this.buildForm();
    });
  }

  buildForm() {
    const controls = {};
    this.fields.forEach(field => {
      controls[field.name] = [field.value || '', this.getValidators(field)];
    });
    this.form = this.fb.group(controls);
  }

  getValidators(field) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    return validators;
  }
}
```

## The Junior Developer’s Approach

### Step 1: Check the Metadata Response

The junior developer starts by checking if the metadata response contains the expected data.

```typescript
ngOnInit() {
  this.formService.getFormMetadata().subscribe((metadata) => {
    console.log('Form Metadata:', metadata);
    this.fields = metadata.fields;
    this.buildForm();
  });
}
```

They see that the metadata is correctly logged in the console but the form still does not render correctly.

### Step 2: Review the Template

Next, they ensure the template is correctly binding the form fields.

```html
<form [formGroup]="form">
  <div *ngFor="let field of fields">
    <label>{{ field.label }}</label>
    <input [formControlName]="field.name" [type]="field.type" />
    <div *ngIf="form.get(field.name).invalid && form.get(field.name).touched">
      {{ field.errorMessage }}
    </div>
  </div>
  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

The template looks correct, so they become puzzled.

### Step 3: Trial and Error

Frustrated, the junior developer begins changing parts of the code to see if anything resolves the issue. They try different methods of initializing the form, updating the metadata, and re-checking the form control setup.

```typescript
ngOnInit() {
  this.formService.getFormMetadata().subscribe((metadata) => {
    this.fields = metadata.fields;
    this.buildForm();
    console.log('Form Controls:', this.form.controls);
  });
}
```

### Result

After a lot of trial and error, they might stumble upon the realization that the problem lies in a more subtle aspect of Angular’s form control setup or metadata structure. This approach is inefficient and time-consuming.

## The Senior Developer’s Approach

### Step 1: Verify the Data Structure

The senior developer first confirms the structure of the metadata returned by the API by logging it.

```typescript
ngOnInit() {
  this.formService.getFormMetadata().subscribe((metadata) => {
    console.log('Form Metadata:', metadata);
    this.fields = metadata.fields;
    this.buildForm();
  });
}
```

They notice that the metadata structure is correct:

```json
{
  "fields": [
    { "name": "username", "label": "Username", "type": "text", "required": true, "minLength": 3, "errorMessage": "Username is required and must be at least 3 characters long." },
    { "name": "password", "label": "Password", "type": "password", "required": true, "minLength": 6, "errorMessage": "Password is required and must be at least 6 characters long." }
  ]
}
```

### Step 2: Adjust the Form Initialization

Understanding the structure, the senior developer modifies the code to ensure the form is correctly initialized with proper validators.

```typescript
ngOnInit() {
  this.formService.getFormMetadata().subscribe((metadata) => {
    this.fields = metadata.fields;
    this.buildForm();
  });
}

buildForm() {
  const controls = {};
  this.fields.forEach(field => {
    controls[field.name] = ['', this.getValidators(field)];
  });
  this.form = this.fb.group(controls);
}
```

### Step 3: Check Angular Lifecycle and Change Detection

To ensure that the change detection is working as expected, the senior developer checks if there are any issues with the Angular lifecycle or asynchronous operations that might be preventing the form from updating.

```typescript
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form">
      <div *ngFor="let field of fields">
        <label>{{ field.label }}</label>
        <input [formControlName]="field.name" [type]="field.type" />
        <div *ngIf="form.get(field.name).invalid && form.get(field.name).touched">
          {{ field.errorMessage }}
        </div>
      </div>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  fields: any[] = [];

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit() {
    this.formService.getFormMetadata().subscribe((metadata) => {
      this.fields = metadata.fields;
      this.buildForm();
    });
  }

  ngAfterViewInit() {
    // Ensure change detection runs after view initialization
    console.log('View Initialized with Form:', this.form);
  }
}
```

### Step 4: Confirm the Solution

They then confirm that the form is now displayed correctly and validation rules are applied.

### Step 5: Refactor for Clarity

To make the code more robust and clear, the senior developer introduces an interface for the API response and updates the service accordingly.

```typescript
interface FieldMetadata {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  minLength?: number;
  errorMessage: string;
}

interface FormMetadata {
  fields: FieldMetadata[];
}

getFormMetadata(): Observable<FormMetadata> {
  return this.http.get<FormMetadata>('https://api.example.com/form-metadata');
}
```

This change ensures that the data structure is clearly defined and helps prevent similar issues in the future.

## Conclusion

The key differences between the junior and senior developers' approaches are efficiency and depth of understanding. The junior developer, while ultimately finding a solution, does so through a time-consuming process of trial and error. The senior developer quickly identifies the root cause by thoroughly understanding the data structure, lifecycle hooks, and Angular’s form control setup, adjusting the code accordingly. This example highlights the importance of experience, attention to detail, and systematic problem-solving in software development.
