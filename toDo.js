(function test() {
    describe("HTMLinjector tests", () => {

      describe("tests for getDivNodeWithIdAndClass",()=>{
        beforeAll(()=>{
          divElement = getDivNodeWithIdAndClass("id","class");});
        it("must return a node class name", () => {
            //assert
            getDivNodeWithIdAndClass("id","class");
            expect(divElement.className).toBe("class");

        });
        it("must return a node with id", () => {
            //assert
            getDivNodeWithIdAndClass("id","class");
            expect(divElement.id).toBe("id");

        });
      });

    describe("getLogoElement tests",()=>{
      beforeAll(()=>{
        link = "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg";
        logoElement = getLogoElement(link);
        imgElementInsideLogo = logoElement.getElementsByTagName('img');
      });
        it("must return a element with given link of image",()=>{
        expect(logoElement.className).toBe('logo');
      });
      it("must have only one image node",()=>{
        expect(imgElementInsideLogo.length).toBe(1);
      });
      it("must contain given link as src in div",()=>{
        expect(imgElementInsideLogo[0].src).toBe(link);
      });
    });

    describe("getInputSearchDivElement tests",()=>{
      beforeAll(()=>{
        inputSearchElement = getInputSearchDivElement();
      });
      it("must have 2 elements",()=>{
        expect(inputSearchElement.getElementsByTagName('*').length).toBe(2);
      });
      it("must contain one button",()=>{
        expect(inputSearchElement.getElementsByTagName('button').length).toBe(1);
      });
      it("must contain one input",()=>{
        expect(inputSearchElement.getElementsByTagName('input').length).toBe(1);
      });
    });

    describe("getButton tests",()=>{
        beforeAll(()=>{
          buttonNode = getButton("","","button1","btn");
      });
        it("must have given className",()=>{
          console.log(buttonNode);
          expect(buttonNode.className).toBe("btn");
        });
        it("must have innerHTML as button1",()=>{
          console.log(buttonNode);
          expect(buttonNode.innerHTML).toBe("button1");
        });
    });

    describe("getFormElement tests",()=>{
      beforeAll(()=>{
        formElement = getFormElement();
      });
      it("must have five elements",()=>{
        expect(formElement.getElementsByTagName('*').length).toBe(5);
      })
    });
});
    describe("search tests",()=>{

    });

})();
