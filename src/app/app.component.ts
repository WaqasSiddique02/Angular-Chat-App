import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatapp';
  messages: { sender: string, message: string }[] = [];
  sender: string = '';
  message: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.sender, this.message);
      this.message = '';
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent the default action (form submission)
      this.sendMessage();
    }
  }
}
