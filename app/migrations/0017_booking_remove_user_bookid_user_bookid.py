# Generated by Django 4.2 on 2023-06-07 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_alter_user_bookid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True, verbose_name='Бронь')),
            ],
            options={
                'verbose_name': 'Бронь',
                'verbose_name_plural': 'Брони',
            },
        ),
        migrations.RemoveField(
            model_name='user',
            name='bookid',
        ),
        migrations.AddField(
            model_name='user',
            name='bookid',
            field=models.ManyToManyField(blank=True, default=None, max_length=30, related_name='bookid', to='app.booking', verbose_name='id_книги'),
        ),
    ]
