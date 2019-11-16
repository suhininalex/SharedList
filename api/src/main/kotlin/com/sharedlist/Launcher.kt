package com.sharedlist

import com.sharedlist.api.ItemsManager
import com.sharedlist.impl.ItemsManagerDummy
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.http.NotFoundResponse

data class Name(val name: String)

fun main() {
    val itemsManager: ItemsManager = ItemsManagerDummy()
    Javalin.create{ config ->
        config.enableCorsForAllOrigins()
    }
    .routes {
        path("/api/items/") {
            get(":id") { context ->
                val id = context.pathParam("id")
                val itemList = itemsManager.find(id)
                if (itemList != null) {
                    context.json(itemList)
                    context.status(200)
                } else {
                    throw NotFoundResponse()
                }
            }

            put("") { context ->
                val value = context.bodyAsClass(Name::class.java)
                val itemList = itemsManager.create(value.name)
                context.json(itemList)
                context.status(201)
            }

            patch(":id") { context ->
                val id = context.pathParam("id")
                val value = context.bodyAsClass(Name::class.java)
                itemsManager.rename(id, value.name)
                context.status(200)
            }
        }

        get("/") { context ->
            context.result("Go duck yourself")
        }
    }
    .start(8080)
}



