import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    //192.168.18.44
    this.socket = io('http://localhost:3000'); // Update with your NestJS server URL
  }

  sendMessage(sender: string, message: string): void {
    this.socket.emit('message', { sender, message });
  }

  onMessage(): Observable<{ sender: string, message: string }> {
    return new Observable(observer => {
      this.socket.on('message', (data: { sender: string, message: string }) => {
        observer.next(data);
      });
    });
  }
}
