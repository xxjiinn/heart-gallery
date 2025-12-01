import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private io: Server | null = null;

  setServer(server: Server) {
    this.io = server;
    console.log('Socket.IO server instance set');
  }

  getServer(): Server | null {
    return this.io;
  }

  emit(event: string, data: any) {
    if (this.io) {
      console.log(`Emitting ${event} event:`, data.id || data);
      this.io.emit(event, data);
    } else {
      console.log('WARNING: Socket.IO instance not available');
    }
  }
}
