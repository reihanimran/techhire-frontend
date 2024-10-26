function Loading () {
    return (
        <section className="py-8">
          <div className="flex items-center justify-center h-40">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
              <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-400"></div>
            </div>
          </div>
        </section>
      );
}

export default Loading