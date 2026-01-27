import {Fragment,useCallback,useContext,useEffect} from "react"
import {Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Separator as RadixThemesSeparator,Text as RadixThemesText} from "@radix-ui/themes"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent} from "$/utils/state"
import {jsx} from "@emotion/react"




function Button_02e31d1ffac5530985da74ae3c8b25cb () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_73c29f1e57142bca062da4bd29389017 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.habitual_trends___habitual_trends____state.decrement", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"ruby",onClick:on_click_73c29f1e57142bca062da4bd29389017,variant:"soft"},"Decrement")
  )
}


function Heading_25a117d83ee3bd394e27f5d44193ce23 () {
  const reflex___state____state__habitual_trends___habitual_trends____state = useContext(StateContexts.reflex___state____state__habitual_trends___habitual_trends____state)



  return (
    jsx(RadixThemesHeading,{size:"7"},reflex___state____state__habitual_trends___habitual_trends____state.count_rx_state_)
  )
}


function Button_7564446258ea86977c9452b0ba37d63a () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_162c49ed9a6ae06375b0ec21bf52af50 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.habitual_trends___habitual_trends____state.increment", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"grass",onClick:on_click_162c49ed9a6ae06375b0ec21bf52af50,variant:"soft"},"Increment")
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["textAlign"] : "center" }),direction:"column",gap:"5"},jsx(RadixThemesHeading,{size:"9"},"Habitual Trends"),jsx(RadixThemesText,{as:"p"},"Track your medical habits and wellness data."),jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"row",gap:"4"},jsx(Button_02e31d1ffac5530985da74ae3c8b25cb,{},),jsx(Heading_25a117d83ee3bd394e27f5d44193ce23,{},),jsx(Button_7564446258ea86977c9452b0ba37d63a,{},)),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesText,{as:"p",css:({ ["colorContentHint"] : true })},"System Status: Operational"))),jsx("title",{},"Habitual Trends"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}