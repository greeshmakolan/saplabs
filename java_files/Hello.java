class Hello {

    void task() {
        System.out.println("Hello");
    }

    void task(String name) {
        System.out.println("Hello " + name);
    }

    public static void main(String[] args) {
        Hello obj = new Hello();

        obj.task();
        obj.task("Greeshma");
    }
}