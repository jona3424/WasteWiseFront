import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAdminComponent } from './mapa-admin.component';

describe('MapaComponent', () => {
  let component: MapaAdminComponent;
  let fixture: ComponentFixture<MapaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaAdminComponent]
    });
    fixture = TestBed.createComponent(MapaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
