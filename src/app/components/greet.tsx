export const Greet = () => {
    console.log("Greetings!");

    return (
        <h1>Greet component</h1>
    ); 
};

export const Hello = () => {
    console.log("Hello!");
    
    return (
        <h1>Hello component</h1>
    );
};

export const NewYear = () => {
    console.log("cheers to the new year!🥂🍾");

    return (
        <h1 className="cursor-pointer hover:text-green-500 active:scale-[.958]">
            Happy New Year!
        </h1>
    );
}