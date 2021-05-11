import service from "../utils/service";

import { call, put, takeLatest } from "redux-saga/effects";

import * as ACT from "../actions/ITreeAction";
import * as REQ from "../../interfaces/IRequest";
import * as RES from "../../interfaces/IResponse";

import store from "../store";

function* workerTreeOnLoadEvent(action: ACT.ITreeOnLoadAction) {}

function* treeSagas() {}

export default treeSagas;
