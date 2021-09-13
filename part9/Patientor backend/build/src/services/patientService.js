"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    const nonSensitivePatients = patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    return nonSensitivePatients;
};
const addEntry = (entry) => {
    const id = uuid_1.v1();
    const newPatientEntry = Object.assign({ id: id }, entry);
    patients_1.default.concat(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};
