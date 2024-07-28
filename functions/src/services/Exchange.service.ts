import axios from 'axios';
import PromiseB from 'bluebird';
import { Exchange } from '@/database/models/Exchange.model';
import * as ProxyService from '@/services/Proxy.service';

const API_URL = 'https://coindataflow.com/en/converter/rate';

const currencies = [
  { from: 'EUR', to: 'BTC' },
  { from: 'EUR', to: 'LTC' },
  { from: 'EUR', to: 'ETH' },
  { from: 'EUR', to: 'USDT' },
  { from: 'EUR', to: 'USD' },
  { from: 'EUR', to: 'EUR' },
];

export const refreshCurrenciesRate = async () => {
  await PromiseB.map(currencies, async (currency) => {
    if (currency.to === 'EUR') {
      await Exchange.findOrCreate({
        where: { to: currency.to },
        defaults: { from: currency.from, rate: 1, to: currency.to },
      });
      return { ...currency, rate: 1 };
    }
    const { data } = await axios({
      method: 'GET',
      httpAgent: ProxyService.getAgent(),
      httpsAgent: ProxyService.getAgent(),
      url: `${API_URL}?from=${currency.from}&to=${currency.to}`,
    });
    await Exchange.update({ rate: data.rate }, { where: { to: currency.to } });
    const exchange = await Exchange.findOrCreate({
      where: { to: currency.to },
      defaults: { from: currency.from, rate: data.rate, to: currency.to },
    });
    if (!exchange[1]) {
      await Exchange.update({ rate: data.rate }, { where: { to: currency.to } });
    }
    return { ...currency, rate: data.rate };
  });
};

export const convert = async (amount: number, currency: string) => {
  if (currency === 'EUR') return amount;
  const exchange = await Exchange.findOne({ where: { to: currency } });
  if (!exchange) throw new Error('Invalid currency');
  return amount * exchange.rate;
};
