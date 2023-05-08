import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buscarCEP';

  constructor(private http: HttpClient) {}

  //variaveis do form
  cep: string='';

  //variaveis do retorno
  endereco: any;
  retorno={
    rua:'',
    cidade:'',
    estado:''
  }

  //logradouro=rua, localidade=cidade, uf=estado
  pesquisado = false;
  espera = false;

  pesquisa(){
    this.espera = true;
    this.cep = this.cep.replace(/\D/g,'');

    const url = 'http://viacep.com.br/ws/' + this.cep + '/json/';

    this.http.get(url).subscribe((res) => {
      this.endereco = res;
      this.retorno.rua = this.endereco.logradouro;
      this.retorno.cidade = this.endereco.localidade;
      this.retorno.estado = this.endereco.uf;
    });

    this.pesquisado = true;
    this.espera = false;
  }

  limpar(){
    this.pesquisado= false;
    this.espera=false;
    this.endereco.replace(/\D/g,'');
    this.retorno.rua.replace(/\D/g,'');
    this.retorno.cidade.replace(/\D/g,'');
    this.retorno.estado.replace(/\D/g,'');
  }

}
