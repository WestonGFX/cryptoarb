import { create } from 'zustand';
import { useMarketStore } from '../stores/marketStore';

interface WebSocketStore {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
}

export const useWebSocket = create<WebSocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: () => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
    
    socket.onopen = () => {
      set({ isConnected: true });
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const marketStore = useMarketStore.getState();
      marketStore.updatePrice('BTC', parseFloat(data.p));
    };

    socket.onclose = () => {
      set({ isConnected: false });
      console.log('WebSocket Disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (!get().isConnected) {
          get().connect();
        }
      }, 5000);
    };

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, isConnected: false });
    }
  },
}));