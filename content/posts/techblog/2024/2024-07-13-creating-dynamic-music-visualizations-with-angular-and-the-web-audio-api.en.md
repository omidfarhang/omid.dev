---
title: "Creating Dynamic Music Visualizations with Angular and the Web Audio API"
date: 2024-07-13T17:43:38+03:30
layout: single
author_profile: true
url: 2024/07/13/creating-dynamic-music-visualizations-with-angular-and-the-web-audio-api/
shortlink: https://g.omid.dev/1bp3eNE
tags:
  - Angular
  - WebAudio API
  - Music Visualization
  - Frontend Development
  - JavaScript
  - Web Development
  - HTML5 Canvas
lang: en
categories: 
  - techblog
---
Music visualization has always been a fascinating way to enhance the auditory experience, offering a visual representation of sound that can be both mesmerizing and informative. With the power of modern web technologies like Angular and the Web Audio API, creating dynamic music visualizations is more accessible than ever. This blog post will guide you through the process of building an engaging music visualization application using Angular and the Web Audio API.

## Prerequisites

Before we dive into the technical details, it's essential to ensure that you have the following prerequisites:

1. **Basic Knowledge of Angular**: Familiarity with Angular framework and TypeScript is necessary.
2. **Understanding of HTML and CSS**: Basic knowledge of HTML and CSS for creating and styling the visual components.
3. **Node.js and npm**: Make sure you have Node.js and npm installed on your machine.

If you're new to Angular, consider reading through the official [Angular Getting Started Guide](https://angular.dev/tutorials) to get up to speed.

## Setting Up the Angular Project

First, let's create a new Angular project. Open your terminal and run the following commands:

```bash
ng new music-visualization
cd music-visualization
ng serve
```

This will set up a new Angular project and start the development server. You can access your application at `http://localhost:4200`.

## Installing Dependencies

For our project, we will need to install a few additional dependencies. We'll use `@angular/cdk` for some utility components and `angular-fontawesome` for icons. Run the following command to install them:

```bash
npm install @angular/cdk @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

## Creating the Audio Service

We'll start by creating a service to handle audio playback and analysis. Create a new file `audio.service.ts` in the `src/app` directory with the following content:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext: AudioContext;
  private audioElement: HTMLAudioElement;
  private source: MediaElementAudioSourceNode;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  init(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;
    this.source = this.audioContext.createMediaElementSource(this.audioElement);
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }

  getFrequencyData(): Uint8Array {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
}
```

This service initializes an `AudioContext`, connects an audio element to an `AnalyserNode`, and provides a method to retrieve frequency data.

## Creating the Visualizer Component

Next, we'll create a component to visualize the audio data. Generate a new component using Angular CLI:

```bash
ng generate component visualizer
```

Update the `visualizer.component.ts` file as follows:

```typescript
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  private canvasContext: CanvasRenderingContext2D;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    const dataArray = this.audioService.getFrequencyData();
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;

    this.canvasContext.clearRect(0, 0, width, height);
    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.canvasContext.fillRect(0, 0, width, height);

    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i] / 2;
      this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
}
```

In this component, we use a `Canvas` element to draw the visualization. The `animate` method continuously updates the canvas with the frequency data retrieved from the `AudioService`.

## Creating the Audio Player Component

We'll also create a component to handle the audio playback. Generate a new component using Angular CLI:

```bash
ng generate component audio-player
```

Update the `audio-player.component.ts` file as follows:

```typescript
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../audio.service';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('audio', { static: true }) audioRef: ElementRef<HTMLAudioElement>;
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  isPlaying = false;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    const audioElement = this.audioRef.nativeElement;
    this.audioService.init(audioElement);
  }

  play() {
    this.audioRef.nativeElement.play();
    this.isPlaying = true;
  }

  pause() {
    this.audioRef.nativeElement.pause();
    this.isPlaying = false;
  }

  stop() {
    const audioElement = this.audioRef.nativeElement;
    audioElement.pause();
    audioElement.currentTime = 0;
    this.isPlaying = false;
  }
}
```

In this component, we handle audio playback and control the audio element. We also use FontAwesome icons for play, pause, and stop buttons.

Update the `audio-player.component.html` file to include the audio controls:

```html
<div class="audio-player">
  <audio #audio src="assets/sample.mp3"></audio>
  <button (click)="play()"><fa-icon [icon]="faPlay"></fa-icon></button>
  <button (click)="pause()" *ngIf="isPlaying"><fa-icon [icon]="faPause"></fa-icon></button>
  <button (click)="stop()"><fa-icon [icon]="faStop"></fa-icon></button>
</div>
```

And add some basic styles in `audio-player.component.css`:

```css
.audio-player {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
}
```

## Integrating Components in the App

Now that we have our components ready, let's integrate them into our main application. Update the `app.component.html` file to include the `audio-player` and `visualizer` components:

```html
<div class="app-container">
  <app-audio-player></app-audio-player>
  <app-visualizer></app-visualizer>
</div>
```

Add some basic styles in `app.component.css` to center the components:

```css
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
  font-family: 'Arial', sans-serif;
}

canvas {
  margin-top: 20px;
  background-color: #000;
  border-radius: 8px;
}
```

## Adding More Visualization Styles

Now that we have a basic bar visualization, let's add more styles to make it more dynamic and visually appealing.

### Circular Visualization

To create a circular visualization, we'll modify the `animate` method in the `VisualizerComponent`:

```typescript
private animate() {
  requestAnimationFrame(() => this.animate());

  const dataArray = this.audioService.getFrequencyData();
  const canvas = this.canvasRef.nativeElement;
  const width = canvas.width;
  const height = canvas.height;
  const radius = Math.min(width, height) / 3;

  this.canvasContext.clearRect(0, 0, width, height);
  this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.canvasContext.fillRect(0, 0, width, height);

  this.canvasContext.beginPath();
  this.canvasContext.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
  this.canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  this.canvasContext.stroke();

  for (let i = 0; i < dataArray.length; i++) {
    const angle = (i / dataArray.length) * 2 * Math.PI;
    const x = width / 2 + Math.cos(angle) * (radius + dataArray[i] / 2);
    const y = height / 2 + Math.sin(angle) * (radius + dataArray[i] / 2);

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(width / 2, height / 2);
    this.canvasContext.lineTo(x, y);
    this.canvasContext.strokeStyle = `hsl(${(i / dataArray.length) * 360}, 100%, 50%)`;
    this.canvasContext.stroke();
  }
}
```

### Waveform Visualization

For a waveform visualization, we can modify the `animate` method again:

```typescript
private animate() {
  requestAnimationFrame(() => this.animate());

  const dataArray = this.audioService.getFrequencyData();
  const canvas = this.canvasRef.nativeElement;
  const width = canvas.width;
  const height = canvas.height;

  this.canvasContext.clearRect(0, 0, width, height);
  this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
  this.canvasContext.fillRect(0, 0, width, height);

  this.canvasContext.lineWidth = 2;
  this.canvasContext.strokeStyle = 'rgb(255, 255, 255)';

  this.canvasContext.beginPath();
  const sliceWidth = width / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const y = height - (dataArray[i] / 255.0) * height;
    if (i === 0) {
      this.canvasContext.moveTo(x, y);
    } else {
      this.canvasContext.lineTo(x, y);
    }
    x += sliceWidth;
  }

  this.canvasContext.lineTo(canvas.width, canvas.height / 2);
  this.canvasContext.stroke();
}
```

## Enhancing User Experience

To make our application more user-friendly, we can add a few more features such as file upload for custom audio files and a settings panel to change visualization styles.

### File Upload

In the `audio-player.component.html` file, add an input element for file upload:

```html
<div class="audio-player">
  <input type="file" (change)="onFileSelected($event)">
  <audio #audio></audio>
  <button (click)="play()"><fa-icon [icon]="faPlay"></fa-icon></button>
  <button (click)="pause()" *ngIf="isPlaying"><fa-icon [icon]="faPause"></fa-icon></button>
  <button (click)="stop()"><fa-icon [icon]="faStop"></fa-icon></button>
</div>
```

Update the `audio-player.component.ts` to handle file selection:

```typescript
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const file = input.files[0];
    const audioElement = this.audioRef.nativeElement;
    audioElement.src = URL.createObjectURL(file);
    this.audioService.init(audioElement);
  }
}
```

### Settings Panel

To allow users to switch between different visualization styles, create a settings component:

```bash
ng generate component settings
```

Update the `settings.component.ts` to handle style selection:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  styles = ['Bar', 'Circular', 'Waveform'];
  selectedStyle = 'Bar';

  onStyleChange(style: string) {
    this.selectedStyle = style;
  }
}
```

Update the `settings.component.html`:

```html
<div class="settings">
  <label for="styleSelect">Visualization Style:</label>
  <select id="styleSelect" [(ngModel)]="selectedStyle" (change)="onStyleChange(selectedStyle)">
    <option *ngFor="let style of styles" [value]="style">{{ style }}</option>
  </select>
</div>
```

Add styles in `settings.component.css`:

```css
.settings {
  margin: 20px;
}

label {
  margin-right: 10px;
}
```

Finally, integrate the settings component in the `app.component.html`:

```html
<div class="app-container">
  <app-settings></app-settings>
  <app-audio-player></app-audio-player>
  <app-visualizer [style]="selectedStyle"></app-visualizer>
</div>
```

Update the `VisualizerComponent` to switch between styles based on the `selectedStyle` input:

```typescript
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  @Input() style: string = 'Bar';
  private canvasContext: CanvasRenderingContext2D;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.canvasContext = this.canvasRef.nativeElement.getContext('2d');
    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    const dataArray = this.audioService.getFrequencyData();
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;

    this.canvasContext.clearRect(0, 0, width, height);
    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.canvasContext.fillRect(0, 0, width, height);

    switch (this.style) {
      case 'Bar':
        this.drawBarVisualization(dataArray, width, height);
        break;
      case 'Circular':
        this.drawCircularVisualization(dataArray, width, height);
        break;
      case 'Waveform':
        this.drawWaveformVisualization(dataArray, width, height);
        break;
    }
  }

  private drawBarVisualization(dataArray: Uint8Array, width: number, height: number) {
    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i] / 2;
      this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight);
      x += barWidth + 1;
    }
  }

  private drawCircularVisualization(dataArray: Uint8Array, width: number, height: number) {
    const radius = Math.min(width, height) / 3;

    this.canvasContext.beginPath();
    this.canvasContext.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    this.canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.canvasContext.stroke();

    for (let i = 0; i < dataArray.length; i++) {
      const angle = (i / dataArray.length) * 2 * Math.PI;
      const x = width / 2 + Math.cos(angle) * (radius + dataArray[i] / 2);
      const y = height / 2 + Math.sin(angle) * (radius + dataArray[i] / 2);

      this.canvasContext.beginPath();
      this.canvasContext.moveTo(width / 2, height / 2);
      this.canvasContext.lineTo(x, y);
      this.canvasContext.strokeStyle = `hsl(${(i / dataArray.length) * 360}, 100%, 50%)`;
      this.canvasContext.stroke();
    }
  }

  private drawWaveformVisualization(dataArray: Uint8Array, width: number, height: number) {
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'rgb(255, 255, 255)';

    this.canvasContext.beginPath();
    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const y = height - (dataArray[i] / 255.0) * height;
      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.canvasContext.lineTo(width, height / 2);
    this.canvasContext.stroke();
  }
}
```

## Further Reading

- [Angular Documentation](https://angular.dev)
- [Web Audio API MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Creating Interactive Audio Visualizations](https://www.smashingmagazine.com/2021/07/audio-visualizations-web-audio-api/)

## Conclusion

In this blog post, we've walked through the process of creating a dynamic music visualization application using Angular and the Web Audio API. We've covered the basics of setting up the project, creating audio playback and visualization components, and enhancing the user experience with file upload and visualization style options.

This project is a great starting point for anyone interested in exploring the intersection of music and visual art using web technologies. With further customization and creativity, you can expand this application to create even more stunning and unique visualizations.
