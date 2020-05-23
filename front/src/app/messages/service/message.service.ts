import { Message } from './../model/message.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs-compat/Rx';
import 'rxjs-compat/operator/map';
import { Observable } from 'rxjs-compat';
import { UserService } from '../../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageService: Message[] = [];
  messageIsEdit = new EventEmitter<any>();

  constructor(private http: Http) {}

  addMessage(message: Message) {
    console.log('mensagem');
    console.log(message);
    const bodyReq = JSON.stringify(message);
    const myHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post(environment.apiBaseUrlMessage + '/enviarMensagem', bodyReq, {
        headers: myHeaders,
      })
      .map((responseRecebida: Response) => {
        var aux = responseRecebida.json();
        const newObjMessage = new Message(
          aux.objMessageSave.content,
          aux.objMessageSave._id,
          'Bruno',
          null,
          aux.objMessageSave.createdAt,
          aux.objMessageSave.updatedAt
        );
        this.messageService.push(newObjMessage);
        return newObjMessage;
      })
      .catch((errorRecebido: Response) =>
        Observable.throw(errorRecebido.json())
      );
  }

  getMessages() {
    return this.http
      .get(environment.apiBaseUrlMessage + '/listarMensagens')
      .map((resposeRecebida: Response) => {
        const responseEmJson = resposeRecebida.json();
        const messageSResponseRecebida = responseEmJson.objsMessageSRecuperados;
        let transformedCastMassagesModelFrontEnd: Message[] = [];

        for (let msg of messageSResponseRecebida) {
          transformedCastMassagesModelFrontEnd.push(
            new Message(msg.content, msg._id, 'Bruno', null, msg.createdAt, msg.updatedAt)
          );
        }

        this.messageService = transformedCastMassagesModelFrontEnd;
        return transformedCastMassagesModelFrontEnd;
      })
      .catch((erroRecebido: Response) => Observable.throw(erroRecebido.json()));
  }
  updateMessage(message: Message) {
    const bodyReq = JSON.stringify(message[0]);
    const myHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .patch(
        environment.apiBaseUrlMessage +
          '/atualizarMensagem/' +
          message[0].messageId,
        bodyReq,
        {
          headers: myHeaders,
        }
      )
      .map((responseRecebida: Response) => responseRecebida.json())
      .catch((errorRecebido: Response) =>
        Observable.throw(errorRecebido.json())
      );
  }

  editMessage(message: Message, messageId: string) {
    const selectedMessage = this.messageService.filter(messageService => messageService.messageId === messageId);

    this.messageIsEdit.emit(selectedMessage);
  }

  deleteMessage(messageId: string) {

    return this.http
      .delete(
        environment.apiBaseUrlMessage +
          '/deletarMensagem/' +
          messageId
      )
      .map((responseRecebida: Response) => {
        responseRecebida.json();
        document.location.reload(true);
      })
      .catch((errorRecebido: Response) =>
        Observable.throw(errorRecebido.json())
      );
  }
}
