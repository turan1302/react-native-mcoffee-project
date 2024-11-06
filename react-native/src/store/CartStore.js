import { action, makeAutoObservable, observable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';

class CartStore {
  totalPrice = 0.00;
  cartData = [];

  constructor() {
    makeAutoObservable(this, {
      totalPrice: observable,
      cartData: observable,
      addToCart: action,
      incrementCartData: action,
      decrementCartData: action,
      removeCartData: action,
      loadCartData: action,
    });

    this.loadCartData();
  }

  async loadCartData() {
    try {
      const data = await AsyncStorage.getItem('cartData');
      if (data) {
        const parsedData = JSON.parse(data);
        this.cartData = parsedData.cartData || [];
        this.totalPrice = parsedData.totalPrice || 0.00;
      }
    } catch (error) {
      console.error("Cart data could not be loaded", error);
    }
  }

  async saveCartData() {
    try {
      const data = {
        cartData: this.cartData,
        totalPrice: this.totalPrice,
      };
      await AsyncStorage.setItem('cartData', JSON.stringify(data));
    } catch (error) {
      console.error("Cart data could not be saved", error);
    }
  }

  addToCart = async (item, qty) => {
    let newProduct = {
      c_coffee : item.c_coffee,
      c_sugar: item.c_sugar,
      c_size: item.c_size,
      c_price: item.c_price,
      c_qty : qty
    };

    if (this.cartData.length > 0) {
      const updatedCart = this.cartData.map((data) => {
        if (data.c_coffee === item.c_coffee && data.c_size===item.c_size) {
          return { ...data, c_qty: data.c_qty + qty };
        }
        return data;
      });

      if (!updatedCart.some(data => data.c_coffee === item.c_coffee && data.c_size === item.c_size)) {
        updatedCart.push({ ...item, c_qty: qty });
      }

      this.cartData = updatedCart;
    } else {
      this.cartData.push({ ...item, c_qty: qty });
    }

    this.totalPrice += item.c_price * qty;
    await this.saveCartData(); // Değişiklikleri kaydet
  };

  incrementCartData = async (item, qty) => {
    this.totalPrice = 0.00;

    const updatedCart = this.cartData.map((data) => {
      if (data.c_coffee === item.c_coffee && data.c_size===item.c_size) {
        const newQty = data.c_qty + qty;

        if (newQty <= 10) {
          const updatedItem = { ...data, c_qty: newQty };
          this.totalPrice += item.c_price * newQty;
          return updatedItem;
        } else {
          return data;
        }
      }
      return data;
    });

    this.totalPrice = updatedCart.reduce((total, item) => {
      return total + (item.c_price * item.c_qty);
    }, 0);

    this.cartData = updatedCart;
    await this.saveCartData(); // Değişiklikleri kaydet
  };

  decrementCartData = async (item, qty) => {
    this.totalPrice = 0.00;

    const updatedCart = this.cartData.reduce((acc, data) => {
      if (data.c_coffee === item.c_coffee && data.c_size === item.c_size) {
        const newQty = data.c_qty - qty;

        // Eğer yeni miktar 0 veya daha az ise, bu ürünü atla (sil)
        if (newQty > 0) {
          const updatedItem = { ...data, c_qty: newQty };
          acc.push(updatedItem);
          this.totalPrice += updatedItem.c_price * updatedItem.c_qty; // Güncellenmiş fiyatı ekle
        }
        // newQty <= 0 olduğu için bu ürünü eklemiyoruz
      } else {
        acc.push(data); // Diğer ürünleri ekle
        this.totalPrice += data.c_price * data.c_qty; // Diğer ürünlerin toplam fiyatını hesapla
      }
      return acc;
    }, []);

    this.cartData = updatedCart;
    await this.saveCartData(); // Değişiklikleri kaydet
  };

  removeCartData = async () => {
    this.cartData = [];
    this.totalPrice = 0.00;
    await this.saveCartData(); // Değişiklikleri kaydet
  }
}

export default new CartStore();
