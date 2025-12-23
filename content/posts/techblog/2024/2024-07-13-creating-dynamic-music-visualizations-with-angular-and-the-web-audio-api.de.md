---
title: "Erstellung dynamischer Musikvisualisierungen mit Angular und der Web Audio API"
date: 2024-07-13T17:43:38+03:30
layout: single
author_profile: true
url: 2024/07/13/creating-dynamic-music-visualizations-with-angular-and-the-web-audio-api/
shortlink: https://g.omid.dev/1bp3eNE
tags:
  - Angular
  - WebAudio API
  - Musikvisualisierung
  - Frontend-Entwicklung
  - JavaScript
  - Webentwicklung
  - HTML5 Canvas
lang: de
categories: 
  - TechBlog
---
Musikvisualisierung war schon immer eine faszinierende Möglichkeit, das Hörerlebnis zu verbessern, indem sie eine visuelle Darstellung von Klang bietet, die sowohl hypnotisierend als auch informativ sein kann. Mit der Leistung moderner Webtechnologien wie Angular und der Web Audio API ist die Erstellung dynamischer Musikvisualisierungen zugänglicher denn je. Dieser Blogbeitrag führt Sie durch den Prozess des Aufbaus einer ansprechenden Musikvisualisierungsanwendung mit Angular und der Web Audio API.

## Voraussetzungen

Bevor wir in die technischen Details eintauchen, ist es wichtig sicherzustellen, dass Sie die folgenden Voraussetzungen erfüllen:

1. **Grundkenntnisse in Angular**: Vertrautheit mit dem Angular-Framework und TypeScript ist erforderlich.
2. **Verständnis von HTML und CSS**: Grundkenntnisse in HTML und CSS zum Erstellen und Stylen der visuellen Komponenten.
3. **Node.js und npm**: Stellen Sie sicher, dass Node.js und npm auf Ihrem Rechner installiert sind.

Wenn Sie neu bei Angular sind, sollten Sie den offiziellen [Angular Getting Started Guide](https://angular.dev/tutorials) lesen, um sich auf den neuesten Stand zu bringen.

## Einrichten des Angular-Projekts

Erstellen wir zunächst ein neues Angular-Projekt. Öffnen Sie Ihr Terminal und führen Sie die folgenden Befehle aus:

```bash
ng new music-visualization
cd music-visualization
ng serve
```

Dies richtet ein neues Angular-Projekt ein und startet den Entwicklungsserver. Sie können auf Ihre Anwendung unter `http://localhost:4200` zugreifen.

## Installieren von Abhängigkeiten

Für unser Projekt müssen wir einige zusätzliche Abhängigkeiten installieren. Wir verwenden `@angular/cdk` für einige Utility-Komponenten und `angular-fontawesome` für Icons. Führen Sie den folgenden Befehl aus, um sie zu installieren:

```bash
npm install @angular/cdk @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

## Erstellen des Audio-Service

Wir beginnen mit der Erstellung eines Service zur Handhabung der Audiowiedergabe und -analyse. Erstellen Sie eine neue Datei `audio.service.ts` im Verzeichnis `src/app` mit folgendem Inhalt:

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

Dieser Service initialisiert einen `AudioContext`, verbindet ein Audio-Element mit einem `AnalyserNode` und bietet eine Methode zum Abrufen von Frequenzdaten.

## Erstellen der Visualizer-Komponente

Als Nächstes erstellen wir eine Komponente zur Visualisierung der Audiodaten. Generieren Sie eine neue Komponente mit der Angular CLI:

```bash
ng generate component visualizer
```

Aktualisieren Sie die Datei `visualizer.component.ts` wie folgt:

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

In dieser Komponente verwenden wir ein `Canvas`-Element, um die Visualisierung zu zeichnen. Die Methode `animate` aktualisiert das Canvas kontinuierlich mit den vom `AudioService` abgerufenen Frequenzdaten.

## Erstellen der Audio-Player-Komponente

Wir erstellen auch eine Komponente zur Handhabung der Audiowiedergabe. Generieren Sie eine neue Komponente mit der Angular CLI:

```bash
ng generate component audio-player
```

Aktualisieren Sie die Datei `audio-player.component.ts` wie folgt:

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

In dieser Komponente handhaben wir die Audiowiedergabe und steuern das Audio-Element. Wir verwenden auch FontAwesome-Icons für Play-, Pause- und Stop-Buttons.

Aktualisieren Sie die Datei `audio-player.component.html`, um die Audiosteuerungen einzuschließen:

```html
<div class="audio-player">
  <audio #audio src="assets/sample.mp3"></audio>
  <button (click)="play()"><fa-icon [icon]="faPlay"></fa-icon></button>
  <button (click)="pause()" *ngIf="isPlaying"><fa-icon [icon]="faPause"></fa-icon></button>
  <button (click)="stop()"><fa-icon [icon]="faStop"></fa-icon></button>
</div>
```

Und fügen Sie einige grundlegende Styles in `audio-player.component.css` hinzu:

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

## Integrieren der Komponenten in die App

Nachdem wir unsere Komponenten bereit haben, integrieren wir sie in unsere Hauptanwendung. Aktualisieren Sie die Datei `app.component.html`, um die Komponenten `audio-player` und `visualizer` einzuschließen:

```html
<div class="app-container">
  <app-audio-player></app-audio-player>
  <app-visualizer></app-visualizer>
</div>
```

Fügen Sie einige grundlegende Styles in `app.component.css` hinzu, um die Komponenten zu zentrieren:

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

## Hinzufügen weiterer Visualisierungsstile

Da wir nun eine einfache Balkenvisualisierung haben, fügen wir weitere Stile hinzu, um sie dynamischer und optisch ansprechender zu gestalten.

### Kreisförmige Visualisierung

Um eine kreisförmige Visualisierung zu erstellen, ändern wir die Methode `animate` in der `VisualizerComponent`:

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

### Wellenform-Visualisierung

Für eine Wellenform-Visualisierung können wir die Methode `animate` erneut ändern:

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

## Verbesserung der Benutzererfahrung

Um unsere Anwendung benutzerfreundlicher zu gestalten, können wir einige weitere Funktionen hinzufügen, wie z. B. Datei-Upload für eigene Audiodateien und ein Einstellungs-Panel zum Ändern der Visualisierungsstile.

### Datei-Upload

Fügen Sie in der Datei `audio-player.component.html` ein Input-Element für den Datei-Upload hinzu:

```html
<div class="audio-player">
  <input type="file" (change)="onFileSelected($event)">
  <audio #audio></audio>
  <button (click)="play()"><fa-icon [icon]="faPlay"></fa-icon></button>
  <button (click)="pause()" *ngIf="isPlaying"><fa-icon [icon]="faPause"></fa-icon></button>
  <button (click)="stop()"><fa-icon [icon]="faStop"></fa-icon></button>
</div>
```

Aktualisieren Sie die `audio-player.component.ts`, um die Dateiauswahl zu handhaben:

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

### Einstellungs-Panel

Um Benutzern das Umschalten zwischen verschiedenen Visualisierungsstilen zu ermöglichen, erstellen Sie eine Settings-Komponente:

```bash
ng generate component settings
```

Aktualisieren Sie die `settings.component.ts`, um die Stilwahl zu handhaben:

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

Aktualisieren Sie die `settings.component.html`:

```html
<div class="settings">
  <label for="styleSelect">Visualisierungsstil:</label>
  <select id="styleSelect" [(ngModel)]="selectedStyle" (change)="onStyleChange(selectedStyle)">
    <option *ngFor="let style of styles" [value]="style">{{ style }}</option>
  </select>
</div>
```

Fügen Sie Styles in `settings.component.css` hinzu:

```css
.settings {
  margin: 20px;
}

label {
  margin-right: 10px;
}
```

Integrieren Sie schließlich die Settings-Komponente in die `app.component.html`:

```html
<div class="app-container">
  <app-settings></app-settings>
  <app-audio-player></app-audio-player>
  <app-visualizer [style]="selectedStyle"></app-visualizer>
</div>
```

Aktualisieren Sie die `VisualizerComponent`, um basierend auf dem Input `selectedStyle` zwischen den Stilen zu wechseln:

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

## Weiterführende Literatur

- [Angular Dokumentation](https://angular.dev)
- [Web Audio API MDN Dokumentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API MDN Dokumentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Erstellung interaktiver Audio-Visualisierungen](https://www.smashingmagazine.com/2021/07/audio-visualizations-web-audio-api/)

## Fazit

In diesem Blogbeitrag haben wir den Prozess der Erstellung einer dynamischen Musikvisualisierungsanwendung mit Angular und der Web Audio API durchlaufen. Wir haben die Grundlagen der Projekteinrichtung, die Erstellung von Audiowiedergabe- und Visualisierungskomponenten sowie die Verbesserung der Benutzererfahrung mit Datei-Upload und Visualisierungsstil-Optionen behandelt.

Dieses Projekt ist ein großartiger Ausgangspunkt für jeden, der daran interessiert ist, die Schnittstelle zwischen Musik und visueller Kunst mit Webtechnologien zu erkunden. Mit weiterer Anpassung und Kreativität können Sie diese Anwendung erweitern, um noch beeindruckendere und einzigartigere Visualisierungen zu erstellen.
