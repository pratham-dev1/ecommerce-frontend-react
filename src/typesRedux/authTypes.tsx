interface InitialState {
    token : null | string | boolean;
    adminToken : null | string | boolean;
  }
  const UpdateAuthAction: string = "token";
  
  export default InitialState;
  export { UpdateAuthAction };