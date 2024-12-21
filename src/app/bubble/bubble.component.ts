import { Component, Input, OnInit } from '@angular/core';
import { Container } from '../models/container';
import { MapaComponent } from '../mapa/mapa.component';


@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit{

  @Input("container")
  container !: Container;

  ngOnInit(){

  }

  imageUploaded(e : any, id : string){
    
    let file = e.target.files[0];

      const reader = new FileReader();

      if(!reader) return;
      reader.onload = function () {
        
        let res = reader.result + "";
          let base64String = res.replace("data:", "")
              .replace(/^.+,/, "");

              let imageBase64Stringsep = base64String;
              const dbObject = {
                b64: imageBase64Stringsep,
                userId: null,
                containerId: id,
                x : MapaComponent.position.lat,
                y : MapaComponent.position.lon
              }

              //TODO: Send dbObject to backend
           alert(JSON.stringify(dbObject));
          console.log(base64String);
      }
      reader.readAsDataURL(file);
  }

}
