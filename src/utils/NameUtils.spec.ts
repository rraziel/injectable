import {NameUtils} from './NameUtils';

describe('Name utility functions', () => {

    describe('can generate a component name', () => {

        it('with capitalized characters', () => {
            // given
            class TestCapitalizedClassName { }
            // when
            let componentName = NameUtils.buildComponentName(TestCapitalizedClassName);
            // then
            expect(componentName).toBe('testCapitalizedClassName');
        });

        it('with consecutive uppercase characters', () => {
            // given
            class TESTConsecutiveUPPERCASEClassNAME { }
            // when
            let componentName = NameUtils.buildComponentName(TESTConsecutiveUPPERCASEClassNAME);
            // then
            expect(componentName).toBe('testConsecutiveUppercaseClassName');
        });

    });

});
