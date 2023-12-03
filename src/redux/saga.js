import { takeLatest, call, put, take } from "redux-saga/effects";
import Apis from "../api";
import { appTypes } from "./types";
import { productAction } from "./action";

const getAllPropertyReq = function* getAllPropertyReq(action) {
  try {
    const payload = action.payload;

    if (!Array.isArray(payload)) {
      return;
    }

    const { data } = yield call(Apis.getAllProducts);
    const mainData = data?.products?.map((item) => ({
      ...item,
      isFav: false,
      isAddedToCart: false,
    }));

    const hashTable = payload?.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const mergedArray = mainData?.map((item1) => ({
      ...item1,
      ...hashTable[item1.id],
    }));

    yield put(productAction.setAllProducts(mergedArray || []));
  } catch (e) {
    yield put(
      productAction.setAllProducts({
        code: e?.response?.status,
        msg: e?.response?.data,
      })
    );
  }
};

export default function* productSaga() {
  yield takeLatest(appTypes.FETCH_ALL_PRODUCTS, getAllPropertyReq);
}
