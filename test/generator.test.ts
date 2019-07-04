import * as sinon from 'sinon';
import { Generator } from '../src/generator';

class ChainedClass {
  public query(query: string): ChainedClass {
    return this;
  }

  public where(whereClause: string): ChainedClass {
    return this;
  }
  public orWhere(whereClause: string): ChainedClass {
    return this;
  }
  public first(whereClause: string): ChainedClass {
    return this;
  }
}
describe('generator', () => {
  describe('generate', () => {
    describe('should generate all chained methods properly when', () => {
      test('multiple methods are chained and need to be stubbed', () => {
        const sandbox = sinon.createSandbox();
        const chainedClass = new ChainedClass();
        const expectedReturn = 'haha!';
        try {
          const [queryStub, orWhereStub, firstStub] = Generator.generate(
            chainedClass,
            sandbox,
            ['query', 'orWhere', 'first'],
            expectedReturn
          );

          expect(queryStub).toBeTruthy();
          expect(orWhereStub).toBeTruthy();
          expect(firstStub).toBeTruthy();
          expect(chainedClass.query('').orWhere('').first('')).toEqual(expectedReturn);
        } catch (e) {
          expect(e).toBeFalsy()
        }
      });
      test('only one method needs to be stubbed', () => {
        const sandbox = sinon.createSandbox();
        const chainedClass = new ChainedClass();
        const expectedReturn = 'haha!';
        try {
          const [queryStub] = Generator.generate(
            chainedClass,
            sandbox,
            ['query'],
            expectedReturn
          );

          expect(queryStub).toBeTruthy();
          expect(chainedClass.query('')).toEqual(expectedReturn);
        } catch (e) {
          expect(e).toBeFalsy()
        }
      });
    });
  });
  describe('should fail to generate method chains when', () => {
    test('no methods are provided to stub', () => {});
  });
});
