import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SensorData {
  energy: number; // 0-100%
  communication: number; // 0-100%
  altitude: number; // km
  temperature: number; // °C
  lastUpdated: string; // ISO timestamp
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
  sensorType: 'energy' | 'communication' | 'altitude' | 'temperature';
}

export interface MissionState {
  missionName: string;
  isActive: boolean;
  sensors: SensorData;
  alerts: Alert[];
  limits: {
    energyMin: number;
    energyMax: number;
    communicationMin: number;
    altitudeMin: number;
    altitudeMax: number;
    temperatureMin: number;
    temperatureMax: number;
  };
}

const initialState: MissionState = {
  missionName: 'Missão Apolo-X',
  isActive: true,
  sensors: {
    energy: 85,
    communication: 92,
    altitude: 408,
    temperature: 22,
    lastUpdated: new Date().toISOString(),
  },
  alerts: [],
  limits: {
    energyMin: 20,
    energyMax: 100,
    communicationMin: 30,
    altitudeMin: 300,
    altitudeMax: 500,
    temperatureMin: -50,
    temperatureMax: 50,
  },
};

type MissionAction =
  | { type: 'UPDATE_SENSORS'; payload: Partial<SensorData> }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string }
  | { type: 'MARK_ALERT_READ'; payload: string }
  | { type: 'CLEAR_ALERTS' }
  | { type: 'UPDATE_LIMITS'; payload: Partial<MissionState['limits']> }
  | { type: 'SET_MISSION_NAME'; payload: string }
  | { type: 'SET_MISSION_ACTIVE'; payload: boolean }
  | { type: 'LOAD_STATE'; payload: MissionState }
  | { type: 'RESET_STATE' };

function missionReducer(state: MissionState, action: MissionAction): MissionState {
  switch (action.type) {
    case 'UPDATE_SENSORS':
      return {
        ...state,
        sensors: {
          ...state.sensors,
          ...action.payload,
          lastUpdated: new Date().toISOString(),
        },
      };

    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      };

    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };

    case 'MARK_ALERT_READ':
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload ? { ...alert, read: true } : alert
        ),
      };

    case 'CLEAR_ALERTS':
      return {
        ...state,
        alerts: [],
      };

    case 'UPDATE_LIMITS':
      return {
        ...state,
        limits: {
          ...state.limits,
          ...action.payload,
        },
      };

    case 'SET_MISSION_NAME':
      return {
        ...state,
        missionName: action.payload,
      };

    case 'SET_MISSION_ACTIVE':
      return {
        ...state,
        isActive: action.payload,
      };

    case 'LOAD_STATE':
      return action.payload;

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

interface MissionContextType {
  state: MissionState;
  updateSensors: (data: Partial<SensorData>) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  markAlertRead: (id: string) => void;
  clearAlerts: () => void;
  updateLimits: (limits: Partial<MissionState['limits']>) => void;
  setMissionName: (name: string) => void;
  setMissionActive: (active: boolean) => void;
  resetState: () => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(missionReducer, initialState);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    loadStateFromStorage();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const loadStateFromStorage = async () => {
    try {
      const savedState = await AsyncStorage.getItem('missionState');
      if (savedState) {
        dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
      }
    } catch (error) {
      console.error('Failed to load mission state:', error);
    }
  };

  const saveStateToStorage = async (stateToSave: MissionState) => {
    try {
      await AsyncStorage.setItem('missionState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save mission state:', error);
    }
  };

  const value: MissionContextType = {
    state,
    updateSensors: (data) => dispatch({ type: 'UPDATE_SENSORS', payload: data }),
    addAlert: (alert) => dispatch({ type: 'ADD_ALERT', payload: alert }),
    removeAlert: (id) => dispatch({ type: 'REMOVE_ALERT', payload: id }),
    markAlertRead: (id) => dispatch({ type: 'MARK_ALERT_READ', payload: id }),
    clearAlerts: () => dispatch({ type: 'CLEAR_ALERTS' }),
    updateLimits: (limits) => dispatch({ type: 'UPDATE_LIMITS', payload: limits }),
    setMissionName: (name) => dispatch({ type: 'SET_MISSION_NAME', payload: name }),
    setMissionActive: (active) => dispatch({ type: 'SET_MISSION_ACTIVE', payload: active }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  };

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission(): MissionContextType {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within MissionProvider');
  }
  return context;
}
