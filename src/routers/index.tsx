import { NavigationContainer } from "@react-navigation/native"
import { TabRouters } from "./TabRouter"

export const Routes = ()=>{
    return(
        <NavigationContainer>
            <TabRouters/>
        </NavigationContainer>
    )
}