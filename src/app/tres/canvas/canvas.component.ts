import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html',
  styleUrl: './canvas.component.css',
})

export class CanvasComponent implements AfterViewInit{
  public size: number = 900;
  public width: number = this.size;
  public height: number = this.size;
  public grid: number = 3;
  public proph: number = this.width / this.grid;
  public propv: number = this.height / this.grid;
  public points: number[] = [];
  public x: number = 0;
  public y: number = 0;

  @ViewChild('myCanvas')
  private myCanvas: ElementRef = {} as ElementRef;
  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.draw();
    for (let i = 0; i < this.lines().length; i+=2) {
      this.draw(this.lines()[i], this.lines()[i+1]);
    }
    this.myCanvas.nativeElement.addEventListener('click', (event: MouseEvent) => {
      this.click(event);
    });

  }

  draw(start:number[]=[0,0], finish:number[]=[0,0], color="black"): void {
    this.context.strokeStyle=color;
    this.context.lineWidth=5;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.beginPath();
    this.context.moveTo(start[0], start[1]);
    this.context.lineTo(finish[0], finish[1]);
    this.context.stroke();
  }

  click(event: MouseEvent): void {
    this.x = event.offsetX;
    this.y = event.offsetY;
  }

  lines(): number[][] {
    const grid = this.grid;
    const size = this.size;
    let prop = size/grid;
    let proph = this.proph;
    let propv = this.propv;
    let i, j = 0;
    let actual = [0,0];
    const points = [];
    // caso trivial
    if(grid===2){
      //horizontal line
      for(i=0;i<grid;i++){
        actual = [proph,i*size];
        points.push(actual);
      }
      //vertical lines
      for(i=0;i<grid;i++){
        actual = [i*size,propv];
        points.push(actual);
      }
      return points
    }
    if(grid%2){
      //horizontal lines
      for (j = 1;j<grid;j++){
        for(i = 0;i<grid-1;i++){
          actual = [proph,i*size];
          points.push(actual);
        }
      proph += prop;
      }
      //vertical lines
      for(i =1;i<grid;i++){
        for(j=0;j<grid-1;j++){
          actual = [j*size,propv];
          points.push(actual);
        }
      propv+=prop;
      }
    }
    else{
      for (j = 1;j<grid;j++){
        for(i = 0;i<grid-2;i++){
          actual = [proph,i*size];
          points.push(actual);
        }
      proph += prop;
    }
    //vertical lines
      for(i =1;i<grid;i++){
        for(j=0;j<grid-2;j++){
          actual = [j*size,propv];
          points.push(actual);
        }
      propv+=prop;
      }
    }
  return points;
}
}
