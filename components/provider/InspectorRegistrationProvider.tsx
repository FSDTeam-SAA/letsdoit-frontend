"use client";

import React, { createContext, useContext, useState } from "react";

export type InspectorRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type InspectorRegistrationContextValue = {
  data: InspectorRegistrationData;
  setData: React.Dispatch<React.SetStateAction<InspectorRegistrationData>>;
  clearData: () => void;
};

const emptyData: InspectorRegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const InspectorRegistrationContext = createContext<
  InspectorRegistrationContextValue | undefined
>(undefined);

const InspectorRegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<InspectorRegistrationData>(emptyData);

  const clearData = () => setData(emptyData);

  return (
    <InspectorRegistrationContext.Provider value={{ data, setData, clearData }}>
      {children}
    </InspectorRegistrationContext.Provider>
  );
};

const useInspectorRegistration = () => {
  const context = useContext(InspectorRegistrationContext);

  if (!context) {
    throw new Error(
      "useInspectorRegistration must be used within InspectorRegistrationProvider"
    );
  }

  return context;
};

export { InspectorRegistrationProvider, useInspectorRegistration };
export default InspectorRegistrationProvider;
