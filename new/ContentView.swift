
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Water tracker 💦")
                .bold()
                .padding()

            HStack {
                Text("Apple health")

                Toggle(isOn: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Is On@*/.constant(true)/*@END_MENU_TOKEN@*/) {
                    /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Label@*/Text("Label")/*@END_MENU_TOKEN@*/
                }
            
            }
            
            HStack {
                
                Text("Cups to drink per day")
                Stepper(value: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Value@*/.constant(4)/*@END_MENU_TOKEN@*/, in: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Range@*/1...10/*@END_MENU_TOKEN@*/) {
                    /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Label@*/Text("Stepper")/*@END_MENU_TOKEN@*/
                }
            }
        
        }
        
        
        .padding()
        
    
        Button("Continue") {
            /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Action@*/ /*@END_MENU_TOKEN@*/
        
        }
      
        
                      
    }
    
  
}

#Preview{
    ContentView()
}


