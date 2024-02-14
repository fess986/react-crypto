import {cryptoData, cryptoAssets} from './data';

// имитируем скачивание инфы по крипте из апишки
export const fetchCryptoData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1)
  })
}

// имитируем скачивание инфы по КУПЛЕННОЙ крипте из апишки
export const fetchCryptoAccets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1)
  })
}

