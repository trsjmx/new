import SwiftUI

struct ContentView: View {
    @State private var isAppleHealthEnabled: Bool = false
    @State private var cupsToDrink: Int = 0

    var body: some View {
        VStack {
            Text("Water Tracker 💦")
                .bold()
                .padding()
                
            HStack {
                Text("Apple Health")
                Toggle("", isOn: $isAppleHealthEnabled) // Bind to state variable
                    .toggleStyle(SwitchToggleStyle())
            }
            .padding()
                
            HStack {
                Text("Cups to drink per day: \(cupsToDrink)")
                Stepper(value: $cupsToDrink, in: 0...10) {
                    
                }
                .padding()
            }
        }
        .padding()
        
        Button("Continue") {
            print(" \(cupsToDrink) cups per day.")
        }
        .foregroundColor(.white)
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.blue)
        .cornerRadius(10)
        .padding()
    }
}

#Preview {
    ContentView()
}
