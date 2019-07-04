import * as sinon from "sinon";

export class Generator {
  public static generate(
    objectToStub: any,
    sandbox: sinon.SinonSandbox,
    methods: string[],
    returnValue: any
  ): Array<sinon.SinonStub<any[], any>> {

    const stubCollection: Array<sinon.SinonStub<any[], any>> = [];
    if (methods.length === 1) {
      stubCollection.push(sandbox.stub(objectToStub, methods[0]).returns(returnValue));
    } else {
      stubCollection.push(sandbox.stub(objectToStub, methods[0]).returns(Generator.generateStub(methods.slice(1), sandbox, returnValue, stubCollection)));

    }

    // reverse because recursion causes inner-most methods to be pushed to stubCollection first
    return stubCollection.reverse();
  }

  private static generateStub(methods: string[], sandbox: sinon.SinonSandbox, returnValue: any, stubCollection: any[]): any {
    const isLastMethod = methods.length === 1;
    let stub;
    if (isLastMethod) {
      stub = sandbox.stub().returns(returnValue);
    } else {
      stub = sandbox.stub({ [methods[0]]: () => { } }, methods[0]).returns(this.generateStub(methods.slice(1), sandbox, returnValue, stubCollection));
    }

    stubCollection.push(stub);
    return { [methods[0]]: stub };
  }
}
