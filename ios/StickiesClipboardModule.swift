import ExpoModulesCore


public class StickiesClipboardModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('StickiesClipboard')` in JavaScript.
    Name("StickiesClipboard")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
        self.sendEvent("onChange", [
            "value": "copying url"
          ])
        
      // let url = Bundle.main.url(forResource: value, withExtension: ".gif")!


      do { 
        // text
        // UIPasteboard.general.string = "Oh yeah"

        // Static image
        // let url = URL(string: value)!
        // let data = try Data(contentsOf: url)
        // let image = UIImage(data: data)
        // UIPasteboard.general.image = image

        // 

          let url = URL(string: value)!
          let data = try Data(contentsOf: url)
          UIPasteboard.general.setData(data, forPasteboardType: "com.compuserve.gif")
//          UIPasteboard.general.image = data;

        

        self.sendEvent("onChange", [
            "value": "Success copying url"
          ])
      } catch {
        self.sendEvent("onChange", [
            "value": "Error copying url"
          ])
      }


      
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(StickiesClipboardView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: StickiesClipboardView, prop: String) in
        print(prop)
      }
    }
  }
}
