describe("Cookie", function() {
    beforeEach(function() {
        cookie = new Cookie("chocolate", 10);
    });

    it("should exist", function() {
        expect(cookie).toBeDefined();
    });

    it("should have a type", function() {
        expect(cookie.getType()).toEqual("chocolate");
    })

    it("should have a time", function() {
        expect(cookie.getTime()).toEqual(10);
    })

    describe("Make Batch", function() {
        it("should put cookie in oven", function() {

        })
    })
});
