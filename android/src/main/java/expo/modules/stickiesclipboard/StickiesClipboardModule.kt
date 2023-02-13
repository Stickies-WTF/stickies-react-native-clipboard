package expo.modules.stickiesclipboard

import android.content.ClipboardManager
import android.content.Context
import android.content.ClipData
import android.net.Uri
import java.io.File
import androidx.core.content.FileProvider

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class StickiesClipboardModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('StickiesClipboard')` in JavaScript.
    Name("StickiesClipboard")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to "Copying"
      ))

      val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
      val file = File(value)
      val imageUri = FileProvider.getUriForFile(context, context.applicationInfo.packageName + ".ClipboardFileProvider", file)

//      val imageUri = ClipboardFileProvider.getUriForFile(
//              context,
//              context.applicationInfo.packageName + ".ClipboardFileProvider",
//              file
//      )

      val clip = ClipData.newUri(context.contentResolver, "Animated GIF", imageUri)
      clipboard.setPrimaryClip(clip)

      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to "Copy finished"
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(StickiesClipboardView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: StickiesClipboardView, prop: String ->
        println(prop)
      }
    }
  }

  private val context
    get() = requireNotNull(appContext.reactContext) {
      "React Application Context is null"
    }
}
